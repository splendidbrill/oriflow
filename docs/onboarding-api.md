# `POST /api/users/onboarding`

Frontend handoff endpoint called when the user finishes the onboarding flow
(`Enter Oriflow` on the Focus screen).

## Request

```http
POST /api/users/onboarding
Content-Type: application/json
Authorization: Bearer <supabase access_token>
```

```json
{
  "journey": "Growth / Goals",
  "direction": "I'm building toward something bigger over time",
  "focusAreas": ["Career & work", "Learning & skill growth", "Mental clarity & focus"]
}
```

### Field shapes (canonical values)

| Field         | Type           | Allowed values                                                                 |
| ------------- | -------------- | ------------------------------------------------------------------------------ |
| `journey`     | `str` enum     | `"Calm / Control"`, `"Growth / Goals"`, `"Explore"`                            |
| `direction`   | `str`          | One of the journey-scoped phrases below — free string, validate per `journey`. |
| `focusAreas`  | `list[str]`    | 1–3 entries, drawn from the option-label set below.                            |

**`direction` values per `journey`:**

- `"Calm / Control"` →
  - `"Something I can improve soon"`
  - `"Something I can build steadily over time"`
- `"Growth / Goals"` →
  - `"I have something specific I want to achieve soon"`
  - `"I'm building toward something bigger over time"`
- `"Explore"` →
  - `"Try a few things and see what helps"`
  - `"Gently get more structure over time"`

**`focusAreas` allowed labels:**

```
Mental clarity & focus
Physical health & energy
Emotional balance & wellbeing
Career & work
Money & financial life
Relationships & social life
Hobbies / routines
Learning & skill growth
Not sure yet
```

## Auth

The `Authorization: Bearer <token>` header carries a Supabase JWT. Verify it
against Supabase's JWKS (`{SUPABASE_URL}/auth/v1/.well-known/jwks.json`) and
extract `sub` for the user id.

## Pydantic v2 model

```python
from enum import Enum
from typing import Annotated
from pydantic import BaseModel, Field, field_validator


class Journey(str, Enum):
    CALM_CONTROL = "Calm / Control"
    GROWTH_GOALS = "Growth / Goals"
    EXPLORE = "Explore"


DIRECTIONS_BY_JOURNEY: dict[Journey, set[str]] = {
    Journey.CALM_CONTROL: {
        "Something I can improve soon",
        "Something I can build steadily over time",
    },
    Journey.GROWTH_GOALS: {
        "I have something specific I want to achieve soon",
        "I'm building toward something bigger over time",
    },
    Journey.EXPLORE: {
        "Try a few things and see what helps",
        "Gently get more structure over time",
    },
}


ALLOWED_FOCUS_AREAS: set[str] = {
    "Mental clarity & focus",
    "Physical health & energy",
    "Emotional balance & wellbeing",
    "Career & work",
    "Money & financial life",
    "Relationships & social life",
    "Hobbies / routines",
    "Learning & skill growth",
    "Not sure yet",
}


class OnboardingPayload(BaseModel):
    journey: Journey
    direction: str = Field(min_length=1)
    focus_areas: Annotated[list[str], Field(alias="focusAreas", min_length=1, max_length=3)]

    model_config = {"populate_by_name": True}

    @field_validator("focus_areas")
    @classmethod
    def _validate_focus_areas(cls, v: list[str]) -> list[str]:
        unknown = [x for x in v if x not in ALLOWED_FOCUS_AREAS]
        if unknown:
            raise ValueError(f"Unknown focus areas: {unknown}")
        if len(set(v)) != len(v):
            raise ValueError("focusAreas must not contain duplicates")
        return v

    def model_post_init(self, __context: object) -> None:
        if self.direction not in DIRECTIONS_BY_JOURNEY[self.journey]:
            raise ValueError(
                f"direction {self.direction!r} is not valid for journey {self.journey.value!r}"
            )
```

## FastAPI route sketch

```python
from fastapi import APIRouter, Depends, status

router = APIRouter(prefix="/api/users")


@router.post("/onboarding", status_code=status.HTTP_200_OK)
async def save_onboarding(
    payload: OnboardingPayload,
    user_id: str = Depends(get_user_id_from_bearer),  # your JWT verifier
) -> dict[str, str]:
    await store_onboarding(user_id, payload)
    return {"status": "ok"}
```

## Response

- `200 OK` on success — frontend calls `useQuizStore.persist.clearStorage()` and
  redirects to `/dashboard`.
- Any non-2xx → frontend re-enables the button and surfaces the response body
  text under the CTA.
