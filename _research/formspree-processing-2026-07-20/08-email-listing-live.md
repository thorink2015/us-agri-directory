# Listing-live email template

Send from `eugen@agdronedirectory.com` after a new profile ships to
production. Tokens in `{{ }}` are placeholders — fill per operator.
Voice matches the site (direct, farmer-first, no marketing fluff, no
em dashes).

---

## Subject line options

Pick one:

- Your AgDrone Directory listing is live: {{company}}
- {{company}} is now live on AgDrone Directory
- Live: your {{state}} listing on AgDroneDirectory

---

## Body

Hi {{first_name_or_owner}},

Your listing is live on the US Ag Drone Directory:

{{profile_url}}

A few quick notes:

1. Please open the page and tell me if anything is wrong. We built it
   from your form submission plus public records where the form was
   blank. If services, drones, crops, counties covered, price range,
   or the description need edits, reply to this email with the changes
   and I'll push them the same day.

2. Farmers who want a quote reach you three ways: the Contact button
   on your profile (opens their email client with your address
   pre-filled), the phone number on the page, and the Get Matched
   form on state pages that routes leads to operators in that state.

3. If you'd like your profile pinned higher on the state hub or listed
   as Featured, reply and I'll walk you through the options.

4. I run a short twice-monthly newsletter for operators called The
   Premium Acre — playbooks on rates, the work that pays more, and
   how to land it. Founding rate is $17/month locked while you stay
   (regular rate is $49). If you want in:
   https://agdronedirectory.com/premium-acre/join

Thanks for listing with us,

Eugen Manoli
Founder, US Ag Drone Directory
eugen@agdronedirectory.com
https://agdronedirectory.com

---

## Per-operator send checklist

Fill this in per operator before sending:

- [ ] `{{company}}` = official company name from the form
- [ ] `{{first_name_or_owner}}` = first name of the person who submitted, or
      "team" if only a company inbox is on file
- [ ] `{{state}}` = primary state (first county slug title-cased)
- [ ] `{{profile_url}}` = `https://agdronedirectory.com/operators/{slug}`
- [ ] Confirm the profile URL renders with a 200 (open in a private
      window)
- [ ] Send from `eugen@agdronedirectory.com`

---

## Ready-to-send queue

All 10 profiles are live in production after PR #148 merges to
`main` (Netlify auto-deploys on merge). Verify each URL renders 200
before sending.

| Operator | Contact | Email | Profile URL | Send status |
|---|---|---|---|---|
| Viewpoint Agriculture | (no name) | contact@viewpointagriculture.com | https://agdronedirectory.com/operators/viewpoint-agriculture | pending |
| EcoAg Aerial Imaging | Adam (adamskijma) | adamskijma@gmail.com | https://agdronedirectory.com/operators/ecoag-aerial-imaging | pending |
| AG Fertilizer, LLC. | Matt | matt@ag-fertilizer.com | https://agdronedirectory.com/operators/ag-fertilizer-llc | pending |
| Heartland Sky | Isaiah Borgos | heartlandskyllc@gmail.com | https://agdronedirectory.com/operators/heartland-sky | pending — enrichment, use "your listing has been updated" variant |
| Leigh Low Aerial Services LLC | (no name) | leighlow.agservices@gmail.com | https://agdronedirectory.com/operators/leigh-low-aerial-services-llc | pending |
| Wolverine Drone Services LLC | Jeff Whiting (+ son Eric) | jeffwhiting@wolverinedroneservices.com | https://agdronedirectory.com/operators/wolverine-drone-services-llc | pending — enrichment, use "your listing has been updated" variant |
| Elevated Ag Drone Services | (no name) | elevatedag2@gmail.com | https://agdronedirectory.com/operators/elevated-ag-drone-services | pending — also mention the blank `elevated-agriculture-llc` record and ask if that is their same entity so we can merge |
| ALTITUDE AGRI SERVICES, LLC | Kurt B | kurt.b@altitudeagriservices.com | https://agdronedirectory.com/operators/altitude-agri-services | pending — use "your listing has been updated" variant; ALSO ask Kurt to confirm city (record says Richland, form said Kennewick) + share his real LinkedIn URL (current record just says 'Y') |
| CropTech Solutions | Randy Biebel | randy@croptech.us | https://agdronedirectory.com/operators/croptech-solutions | pending — use "your listing has been updated" variant |
| Volitant Technologies | (no name) | info@volitant.tech | https://agdronedirectory.com/operators/volitant-technologies | pending — use "your listing has been updated" variant; ALSO confirm coverage (we moved city from Birmingham AL to Dunbar NE per the form; if they still cover Southeast states, we can restore those counties) |

For the three updates (Altitude, CropTech, Volitant), swap the
"listing is live" opener for "your listing has been updated" and drop
point 1's "we built it from public records" line.
