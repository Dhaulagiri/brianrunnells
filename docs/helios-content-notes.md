# Helios case study: claim scope

The page is organised by the six Helios principles, in their published order,
with one section per principle. The principle text is quoted verbatim from
[the published principles](https://helios.hashicorp.design/about/principles),
checked October 18, 2026; the 03 quotation is trimmed of its opening clause,
which the page notes by quoting only the committing sentences. Each section
also states the tradeoff that principle demanded, which is Brian's account
rather than anything the published page claims.

The before/after figure in section 01 is a reconstruction, not a reproduction:
the buttons and hex values are invented to show the kind of drift described,
the caption says so on the page, and no internal interface appears. Its
`--token-color-palette-blue-300` label is illustrative and is deliberately not
one of the token names the closing section shows at a real value.

The closing section's token names follow Helios conventions, but the values are
this site's own. It does not claim to reproduce the Helios token set.

The case study is Brian's account of his work. It distinguishes his ownership
of direction, team building, and adoption from the team's design and
implementation. It makes no claim that he individually designed or coded all
of Helios.

- **Mandate and replacement decision:** Brian's firsthand account, October 18,
  2026: hired with an open-ended mandate, built the team and system, and
  successfully advocated replacing the existing system.
  Brian further clarified that design/code inconsistency, code scalability,
  and uneven adoption motivated the replacement.
- **Figma/code parity:** Brian reports full parity, enabling Design and
  Engineering to work in sync. This describes the system during his leadership;
  it is not a current audit or a claim about every release today.
- **Accessibility and consistency:** qualitative outcomes reported by Brian.
  No invented percentage improvement, compliance certification, or audit score.
- **Delivery speed:** anecdotal feedback only. The page explicitly distinguishes
  reported faster delivery from a measured velocity gain.
- **Adoption:** existing career evidence records 100+ engineers and designers,
  and an adoption dashboard Brian built tracking net adoption of 20,000+
  component instances across roughly eight products. The page identifies this
  as a historical snapshot, not current telemetry.
- **Technical work and accessibility leadership:** existing career evidence
  supports TypeScript/GTS discovery and modernization, and recruiting/backing
  the accessibility leader. Detailed accessibility function credit stays with
  that leader.
- **Public artifacts:** [Helios documentation](https://helios.hashicorp.design/)
  and [source repository](https://github.com/hashicorp/design-system), checked
  October 18, 2026, support the nature of the system and let readers inspect
  the team's work. They do not independently substantiate internal adoption
  counts, personal attribution, or delivery-speed outcomes.
- **Portfolio context:** HashiCorp's [2022 year in review](https://www.hashicorp.com/en/blog/hashicorp-2022-year-in-review)
  establishes the historical portfolio, including Terraform, Vault, Consul,
  Nomad, Boundary, Waypoint, Packer, Vagrant, and HCP. This is portfolio context,
  not an assertion that each named product used Helios or is one of the eight
  interfaces counted in the adoption dashboard.
- **Launch:** the [January 31, 2023 announcement](https://www.hashicorp.com/en/blog/introducing-helios-hashicorp-s-new-design-system)
  carries Brian and Misha Dhar's bylines and reports support for the full cloud
  product suite, following an internal launch six months earlier.

No confidential screenshots, internal dashboards, individual coaching detail,
or private colleague names are included. Copy is centralized in
`src/data/site.ts`.
