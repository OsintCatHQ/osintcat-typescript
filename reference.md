# Reference
## Account
<details><summary><code>client.account.<a href="/src/api/resources/account/client/Client.ts">get</a>() -> OsintCat.UserResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns the account the API key belongs to: plan, plan expiry, and how many lookups are left today.

Does not count as a lookup.

Needs the `account:read` scope (keys with all scopes have it).

Errors:
- 401 `API key required`: No `X-API-KEY` header.
- 403 `Invalid API key`: The key does not exist or was revoked.
- 403 `insufficient_scope`: The key lacks the `account:read` scope.

Docs: https://docs.osintcat.net/api-reference/endpoint/user
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.account.get();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `AccountClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.account.<a href="/src/api/resources/account/client/Client.ts">modules</a>() -> OsintCat.ModulesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Lists every module with its current state and whether your account can use it. Use it to check access before calling a lookup: a lookup for a module your plan does not include is refused with `403 ACCESS_DENIED`.

Does not count as a lookup.

Needs the `osint:read` scope.

Errors:
- 401 `Unauthorized`: Missing or unknown key.

Docs: https://docs.osintcat.net/api-reference/endpoint/modules
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.account.modules();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `AccountClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Breach
<details><summary><code>client.breach.<a href="/src/api/resources/breach/client/Client.ts">search</a>({ ...params }) -> OsintCat.BreachResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Searches the breach indexes (including Snusbase, LeakCheck and IntelX) for a value and returns every matching record. The search is case-insensitive.

Results for the same query may come from a cache for up to two days.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Docs: https://docs.osintcat.net/api-reference/endpoint/breach
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.breach.search({
    query: "user@example.com"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.SearchBreachRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `BreachClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.breach.<a href="/src/api/resources/breach/client/Client.ts">databaseSearch</a>({ ...params }) -> OsintCat.DatabaseSearchResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Searches stealer-log and combo-list collections for an e-mail address or a domain.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 502 `Upstream error`: The search backend answered with an error. Not charged.
- 504 `timeout error`: The search backend did not answer in time. Not charged.

Docs: https://docs.osintcat.net/api-reference/endpoint/database-search
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.breach.databaseSearch({
    query: "user@example.com"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.DatabaseSearchBreachRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `BreachClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.breach.<a href="/src/api/resources/breach/client/Client.ts">domain</a>({ ...params }) -> OsintCat.DomainResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns breach records whose e-mail addresses or URLs belong to a domain.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, requests are refused with `429 LIMIT_REACHED` until it resets at 00:00 UTC.

Errors:
- 404 `No results found`: Nothing was found for the domain.
- 502 `Upstream error`: The search could not be completed; the response carries an `error_id`.

Docs: https://docs.osintcat.net/api-reference/endpoint/domain
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.breach.domain({
    query: "example.com"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.DomainBreachRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `BreachClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Email
<details><summary><code>client.email.<a href="/src/api/resources/email/client/Client.ts">lookup</a>({ ...params }) -> OsintCat.EmailOsintResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Checks which websites and services an e-mail address is registered with and in which breaches it appears. Every request must state its purpose.

A request without a purpose (parameter `purpose`, header `X-Purpose`, or `Purpose: ...` at the end of your User-Agent) is refused with `400 USER_AGENT_IDENTITY_REQUIRED`.

Does not use your daily allowance. Each lookup that finds something is charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing, or fails, is not charged.

Errors:
- 400 `USER_AGENT_IDENTITY_REQUIRED`: No purpose given.
- 401 `API key required`: No `X-API-KEY` header.
- 402 `INSUFFICIENT_BALANCE`: Your balance does not cover the lookup.
- 502 `Provider Error`: The lookup could not be completed. Not charged.

Docs: https://docs.osintcat.net/api-reference/endpoint/email-osint
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.email.lookup({
    query: "user@example.com",
    purpose: "fraud prevention"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.LookupEmailRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EmailClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Phone
<details><summary><code>client.phone.<a href="/src/api/resources/phone/client/Client.ts">lookup</a>({ ...params }) -> OsintCat.PhoneOsintResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns what is known about a phone number: whether it is valid, the carrier and line type, the country, linked online accounts and a risk score.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `phone_*`: The number cannot be a valid phone number; `code` says why (e.g. `phone_too_short`).
- 502 `Upstream provider error`: The lookup could not be completed.
- 504 `The request timed out.`: The lookup took too long.

Docs: https://docs.osintcat.net/api-reference/endpoint/phone-osint
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.phone.lookup({
    query: "+4915112345678"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.LookupPhoneRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PhoneClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Ip
<details><summary><code>client.ip.<a href="/src/api/resources/ip/client/Client.ts">lookup</a>({ ...params }) -> OsintCat.IpResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns what is known about an IP address: open ports and services seen on it, hostnames, and its location and network.

Results for the same address may come from a cache for up to two days.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Docs: https://docs.osintcat.net/api-reference/endpoint/ip
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.ip.lookup({
    query: "8.8.8.8"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.LookupIpRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `IpClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Dns
<details><summary><code>client.dns.<a href="/src/api/resources/dns/client/Client.ts">resolve</a>({ ...params }) -> OsintCat.DnsResolverResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Resolves one or more hostnames to their IP addresses.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Docs: https://docs.osintcat.net/api-reference/endpoint/dns-resolver
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.dns.resolve({
    query: "example.com,osintcat.net"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.ResolveDnsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DnsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Minecraft
<details><summary><code>client.minecraft.<a href="/src/api/resources/minecraft/client/Client.ts">player</a>({ ...params }) -> OsintCat.MinecraftResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Combines the Minecraft profile of a player (UUID, name history, capes, skins) with records about them found in Minecraft server leaks.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Docs: https://docs.osintcat.net/api-reference/endpoint/minecraft
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.minecraft.player({
    query: "Notch"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.PlayerMinecraftRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `MinecraftClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.minecraft.<a href="/src/api/resources/minecraft/client/Client.ts">leaks</a>({ ...params }) -> OsintCat.MinecraftOsintResponse | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Searches Minecraft server leaks for one value. Use [Minecraft Player](https://docs.osintcat.net/api-reference/endpoint/minecraft) for a profile plus leaks in one call.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `invalid query type`: `type` is missing or not one of the allowed values; `allowed_types` lists them.
- 502 `Upstream returned an empty response`: The search could not be completed; the response carries an `error_id`.

Docs: https://docs.osintcat.net/api-reference/endpoint/minecraft-osint
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.minecraft.leaks({
    query: "Notch",
    type: "username"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.LeaksMinecraftRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `MinecraftClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.minecraft.<a href="/src/api/resources/minecraft/client/Client.ts">profile</a>({ ...params }) -> OsintCat.MinecraftProfileResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Look up a Minecraft account by its username and get the public profile.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `Missing username parameter`: No `username` given.

Docs: https://docs.osintcat.net/api-reference/endpoint/minecraft-profile
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.minecraft.profile({
    username: "Notch"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.ProfileMinecraftRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `MinecraftClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Steam
<details><summary><code>client.steam.<a href="/src/api/resources/steam/client/Client.ts">profile</a>({ ...params }) -> OsintCat.SteamResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Look up a Steam account by its username and get the public profile.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `Missing username parameter`: No `username` given.

Docs: https://docs.osintcat.net/api-reference/endpoint/steam
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.steam.profile({
    username: "gaben"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.ProfileSteamRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SteamClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Xbox
<details><summary><code>client.xbox.<a href="/src/api/resources/xbox/client/Client.ts">profile</a>({ ...params }) -> OsintCat.XboxResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Look up a Xbox account by its username and get the public profile.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `Missing username parameter`: No `username` given.

Docs: https://docs.osintcat.net/api-reference/endpoint/xbox
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.xbox.profile({
    username: "Major Nelson"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.ProfileXboxRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `XboxClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Twitch
<details><summary><code>client.twitch.<a href="/src/api/resources/twitch/client/Client.ts">profile</a>({ ...params }) -> OsintCat.TwitchResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Look up a Twitch account by its username and get the public profile.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `Missing username parameter`: No `username` given.

Docs: https://docs.osintcat.net/api-reference/endpoint/twitch
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.twitch.profile({
    username: "xqc"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.ProfileTwitchRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TwitchClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Chess
<details><summary><code>client.chess.<a href="/src/api/resources/chess/client/Client.ts">lookup</a>({ ...params }) -> OsintCat.ChessResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns the Chess.com profile of a player (ratings, clubs) and any records about the account found in the Chess.com leak.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Docs: https://docs.osintcat.net/api-reference/endpoint/chess
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.chess.lookup({
    query: "hikaru"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.LookupChessRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ChessClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Github
<details><summary><code>client.github.<a href="/src/api/resources/github/client/Client.ts">profile</a>({ ...params }) -> OsintCat.GithubResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Look up a GitHub account by its username and get the public profile.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `Missing username parameter`: No `username` given.

Docs: https://docs.osintcat.net/api-reference/endpoint/github
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.github.profile({
    username: "octocat"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.ProfileGithubRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `GithubClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Reddit
<details><summary><code>client.reddit.<a href="/src/api/resources/reddit/client/Client.ts">profile</a>({ ...params }) -> OsintCat.RedditResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Look up a Reddit account by its username and get the public profile.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `Missing username parameter`: No `username` given.

Docs: https://docs.osintcat.net/api-reference/endpoint/reddit
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.reddit.profile({
    username: "unidan"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.ProfileRedditRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RedditClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## X
<details><summary><code>client.x.<a href="/src/api/resources/x/client/Client.ts">profile</a>({ ...params }) -> OsintCat.TwitterResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns the public profile of an X (Twitter) account and an automated, best-effort summary of its recent public posts (topics, language, tone, posting pattern). Treat the summary as unverified.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 404 `User '...' not found on X (Twitter).`: No account with that username. Not charged.

Docs: https://docs.osintcat.net/api-reference/endpoint/twitter
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.x.profile({
    query: "jack"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.ProfileXRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `XClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Tiktok
<details><summary><code>client.tiktok.<a href="/src/api/resources/tiktok/client/Client.ts">resolveShareLink</a>({ ...params }) -> OsintCat.TiktokResolverResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Resolves a TikTok share link (e.g. `https://vm.tiktok.com/...`) to the account that shared it, with share details and the video.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `Provide a valid TikTok short link via ?link=...`: No link, or not a TikTok link.
- 404 `No user found for this link`: The link carries no sharer.
- 502 `Could not resolve link`: The link could not be resolved right now.

Docs: https://docs.osintcat.net/api-reference/endpoint/tiktok-resolver
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tiktok.resolveShareLink({
    link: "https://vm.tiktok.com/ZMexample/"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.ResolveShareLinkTiktokRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TiktokClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Instagram
<details><summary><code>client.instagram.<a href="/src/api/resources/instagram/client/Client.ts">resolveShareLink</a>({ ...params }) -> OsintCat.InstagramResolverResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Resolves an Instagram post or reel share link to the account that shared it and the author of the post. Profile links cannot be resolved.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `Provide a valid Instagram URL via ?link=...`: No link, not an Instagram link, or the link expired or points to a private post. Not charged.
- 422 `profile_link`: A profile link: only post and reel share links can be resolved. Not charged.
- 502 `(message)`: The link could not be resolved right now. Not charged.

Docs: https://docs.osintcat.net/api-reference/endpoint/instagram-resolver
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instagram.resolveShareLink({
    link: "https://www.instagram.com/reel/Cexample/?igsh=MWexample"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.ResolveShareLinkInstagramRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `InstagramClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Vin
<details><summary><code>client.vin.<a href="/src/api/resources/vin/client/Client.ts">query</a>({ ...params }) -> OsintCat.VinResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Decodes vehicle identification numbers and answers catalogue questions (makes, models, manufacturers, vehicle variables). Choose what to do with `type`.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, the lookup can continue at a per-lookup price charged to your balance (the module's page in the dashboard shows the price); a lookup that finds nothing is not charged.

Errors:
- 400 `query parameter is required`: `query` missing where the chosen type needs it.
- 400 `Maximum 50 VINs allowed`: `batch` with more than 50 VINs.
- 400 `Invalid query type / Invalid search_type`: Unknown `type` or `search_type`.

Docs: https://docs.osintcat.net/api-reference/endpoint/vin
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.vin.query({
    query: "1HGCM82633A004352"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.QueryVinRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `VinClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Chile
<details><summary><code>client.chile.<a href="/src/api/resources/chile/client/Client.ts">person</a>({ ...params }) -> OsintCat.ChileanNameResponse | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Searches Chilean public records for people by name.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, requests are refused with `429 LIMIT_REACHED` until it resets at 00:00 UTC.

Docs: https://docs.osintcat.net/api-reference/endpoint/chilean-name
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.chile.person({
    query: "Juan Perez"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.PersonChileRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ChileClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.chile.<a href="/src/api/resources/chile/client/Client.ts">vehicle</a>({ ...params }) -> OsintCat.ChileanCarResponse | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Searches Chilean vehicle records by licence plate.

Counts as one lookup against your plan's daily allowance (Max: unlimited). When the allowance is used up, requests are refused with `429 LIMIT_REACHED` until it resets at 00:00 UTC.

Docs: https://docs.osintcat.net/api-reference/endpoint/chilean-car
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.chile.vehicle({
    query: "ABCD12"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `OsintCat.VehicleChileRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ChileClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

