# AfriEstate Supabase Schema Guide

## Overview

AfriEstate uses Supabase for data persistence, auth session checks, and realtime administrative broadcasts. The frontend data access layer is centralized in `lib/data.ts`, which expects several tables and fields.

This schema guide describes the tables inferred from the application code. Adjust column types and policies according to your production requirements.

## General Conventions

Recommended conventions:

- Use `uuid` primary keys where possible.
- Store timestamps as `timestamptz` or numeric milliseconds consistently.
- Use `jsonb` for nested objects such as addresses, property details, amenities, images, agents, and financial records.
- Enable Row Level Security on all user-facing tables.
- Add `created_at` and `updated_at` columns to operational tables.

## Tables

## `properties`

Stores marketplace listings, including real estate, stays, vehicles, and wellness providers.

Suggested columns:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `text` or `uuid` | Primary key. Existing mock data uses string IDs. |
| `title` | `text` | Listing title. |
| `listing_type` | `text` | Maps to `ListingType`. |
| `property_type` | `text` | Maps to `PropertyType`. |
| `address` | `jsonb` | `{ street, city, zip }`. |
| `coordinates` | `jsonb` | `{ lat, lng }`. |
| `price` | `numeric` | Listing price. |
| `purchase_price` | `numeric` | Optional acquisition or purchase price. |
| `details` | `jsonb` | `{ beds, baths, area }`. |
| `description` | `text` | Full listing description. |
| `neighborhood_info` | `text` | Local area summary. |
| `amenities` | `jsonb` | Array of strings. |
| `images` | `jsonb` | Array of image URLs. |
| `virtual_tour_url` | `text` | Optional embedded tour URL. |
| `vr_tour_url` | `text` | Optional VR URL. |
| `agent` | `jsonb` | Agent details. |
| `featured` | `boolean` | Featured flag. |
| `verified` | `boolean` | Listing verification flag. |
| `smart_contract_ready` | `boolean` | Optional blockchain readiness flag. |
| `views` | `integer` | View count. |
| `status` | `text` | Maps to `PropertyStatus`. |
| `date_listed` | `bigint` | Millisecond timestamp. |
| `saves` | `integer` | Save count. |
| `price_history` | `jsonb` | Optional price history array. |
| `occupancy_rate` | `numeric` | Optional investment metric. |
| `market_roi` | `numeric` | Optional investment metric. |
| `financials` | `jsonb` | Optional financial event records. |
| `guests` | `integer` | Optional stay capacity. |
| `vehicle_type` | `text` | Optional vehicle category. |
| `package_includes` | `jsonb` | Optional array for stay/wellness packages. |
| `per_night_price` | `boolean` | Optional price display mode. |
| `created_at` | `timestamptz` | Default `now()`. |
| `updated_at` | `timestamptz` | Maintained by trigger or app. |

## `agent_profiles`

Stores public and editable agent profile information.

| Column | Type | Notes |
| --- | --- | --- |
| `username` | `text` | Primary or unique key. |
| `bio` | `text` | Agent biography. |
| `email` | `text` | Contact email. |
| `phone` | `text` | Contact phone. |
| `profile_picture` | `text` | URL or data URL. |
| `socials` | `jsonb` | Social links. |
| `created_at` | `timestamptz` | Default `now()`. |
| `updated_at` | `timestamptz` | Maintained by trigger or app. |

## `reviews`

Stores agent reviews.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key, default `gen_random_uuid()`. |
| `agent_name` | `text` | Reviewed agent. |
| `reviewer_username` | `text` | Reviewer identity. |
| `rating` | `integer` | Rating value. |
| `comment` | `text` | Review body. |
| `timestamp` | `bigint` | Millisecond timestamp used by app. |
| `created_at` | `timestamptz` | Default `now()`. |

## `tour_requests`

Stores tour requests and booking-style requests for properties, stays, vehicles, and wellness services.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` or `text` | Primary key. |
| `property_id` | `text` | Linked listing ID. |
| `property_title` | `text` | Snapshot title. |
| `username` | `text` | Requesting user. |
| `date` | `text` | Requested date. |
| `time` | `text` | Requested time. |
| `status` | `text` | `Pending`, `Confirmed`, or `Cancelled`. |
| `timestamp` | `bigint` | Millisecond timestamp. |
| `created_at` | `timestamptz` | Default `now()`. |

## `messages`

Stores user, agent, and investor messages.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` or `text` | Primary key. |
| `property_id` | `text` | Related property. |
| `property_title` | `text` | Snapshot title. |
| `sender_username` | `text` | Sender. |
| `receiver_username` | `text` | Receiver. |
| `text` | `text` | Message content. |
| `timestamp` | `bigint` | Millisecond timestamp. |
| `created_at` | `timestamptz` | Default `now()`. |

## `calendar_events`

Stores agent calendar events.

Suggested fields:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` or `text` | Primary key. |
| `agent_username` | `text` | Owner. |
| `title` | `text` | Event title. |
| `date` | `text` | Event date. |
| `time` | `text` | Event time. |
| `type` | `text` | Event category. |
| `details` | `jsonb` | Optional extra details. |
| `created_at` | `timestamptz` | Default `now()`. |

## `leads`

Stores leads visible to agents.

Suggested fields:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` or `text` | Primary key. |
| `agent_username` | `text` | Assigned agent. |
| `name` | `text` | Lead name. |
| `email` | `text` | Lead email. |
| `phone` | `text` | Lead phone. |
| `status` | `text` | Lead status. |
| `source` | `text` | Lead source. |
| `property_id` | `text` | Optional linked property. |
| `notes` | `text` | Optional notes. |
| `created_at` | `timestamptz` | Default `now()`. |

## `investor_settings`

Stores investor preferences and dashboard settings.

Suggested fields:

| Column | Type | Notes |
| --- | --- | --- |
| `username` | `text` | Primary or unique key. |
| `settings` | `jsonb` | Flexible investor settings object. |
| `created_at` | `timestamptz` | Default `now()`. |
| `updated_at` | `timestamptz` | Maintained by trigger or app. |

## `investment_requests`

Stores requests for investment opportunities.

Suggested fields:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` or `text` | Primary key. |
| `investor_username` | `text` | Requesting investor. |
| `property_id` | `text` | Target property. |
| `amount` | `numeric` | Requested investment amount. |
| `status` | `text` | Request status. |
| `message` | `text` | Optional message. |
| `timestamp` | `bigint` | Millisecond timestamp. |
| `created_at` | `timestamptz` | Default `now()`. |

## `notifications`

Stores system and real-time news notifications.

Suggested fields:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` or `text` | Primary key. |
| `type` | `text` | Maps to notification type enum. |
| `title` | `text` | Notification title. |
| `message` | `text` | Notification body. |
| `link` | `text` | Optional deep link. |
| `timestamp` | `bigint` | Millisecond timestamp. |
| `created_at` | `timestamptz` | Default `now()`. |

## `read_notifications`

Tracks notification read state per user.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key. |
| `username` | `text` | User identifier. |
| `notification_id` | `text` | Notification ID. |
| `read_at` | `timestamptz` | Default `now()`. |

## `saved_properties`

Tracks saved listings per user.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key. |
| `username` | `text` | User identifier. |
| `property_id` | `text` | Saved property ID. |
| `created_at` | `timestamptz` | Default `now()`. |

## `saved_searches`

Stores saved user search filters.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key. |
| `username` | `text` | User identifier. |
| `filters` | `jsonb` | Search filter object. |
| `created_at` | `timestamptz` | Default `now()`. |

## Realtime

The admin state context uses Supabase Realtime broadcast on:

- Channel: `admin-state-broadcast`
- Event: `admin-action`

No dedicated table is required for this broadcast channel unless you want to persist admin audit logs.

## Row Level Security Recommendations

Enable RLS for every table and add policies such as:

- Public can read active, verified marketplace listings.
- Authenticated users can manage their own saved properties and saved searches.
- Users can read and send messages where they are sender or receiver.
- Agents can manage their own listings, leads, profile, and calendar events.
- Investors can manage their own settings and investment requests.
- Admin-only operations should require custom claims or a secure backend.

## Migration Recommendation

Create formal SQL migrations for this schema instead of relying on manual table creation. Keep migrations in a versioned directory, such as:

```text
supabase/migrations/
```
