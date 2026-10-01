# Fonts

Three families, self-hosted. They used to arrive from `fonts.googleapis.com` at
runtime; now they sit here and ship from our own origin. The `@font-face` rules
that point at these files are in [`src/styles/fonts.css`](../../src/styles/fonts.css).

All three are SIL Open Font License 1.1. The licences are next to the fonts, as
the OFL asks:

| Family           | Licence                    | Upstream                                                        |
| ---------------- | -------------------------- | --------------------------------------------------------------- |
| Instrument Serif | `Instrument-Serif-OFL.txt` | <https://github.com/google/fonts/tree/main/ofl/instrumentserif> |
| JetBrains Mono   | `JetBrains-Mono-OFL.txt`   | <https://github.com/google/fonts/tree/main/ofl/jetbrainsmono>   |
| Archivo          | `Archivo-OFL.txt`          | <https://github.com/google/fonts/tree/main/ofl/archivo>         |

## What is in each file

Archivo and JetBrains Mono are variable fonts with the weight axis kept, so one
file serves every weight the site uses. Archivo's width axis is pinned at 100
because nothing here asks for a condensed Archivo. Instrument Serif has no
variable version and no bold — just regular and italic, which is all it is used
for.

| File                                  | Face                            |
| ------------------------------------- | ------------------------------- |
| `instrument-serif-latin.woff2`        | regular                         |
| `instrument-serif-italic-latin.woff2` | italic                          |
| `jetbrains-mono-latin.woff2`          | variable, `wght` 400–600        |
| `archivo-latin.woff2`                 | variable, `wght` 400–900        |
| `*-latin-ext.woff2`                   | the same faces, latin-ext range |

Each face is split into a `latin` and a `latin-ext` subset on the same
`unicode-range` boundaries Google Fonts uses. Nothing in today's copy falls in
the latin-ext range, so those four files are never fetched — they are there so a
future accented name renders in the right typeface instead of falling back.

The latin subsets keep the punctuation this site actually writes with: curly
quotes, en and em dashes, `×`, `»`, `·`, and the arrows `↑ → ↓`. Instrument
Serif is the exception — it has no arrow glyphs upstream, so its `unicode-range`
omits them and arrows set in the serif fall through to the next family, which is
what happened with Google's subsets too.

## Regenerating them

Needs [fonttools](https://github.com/fonttools/fonttools) with Brotli, which is
a one-off local install and not a project dependency:

```sh
python3 -m venv /tmp/fonts && /tmp/fonts/bin/pip install "fonttools[woff]"
```

Fetch the upstream sources, pin the variable axes, then subset. `LATIN` and
`LATINX` below are Google Fonts' own ranges; the serif drops `U+2191-2193`
because it has no arrows.

```sh
base=https://raw.githubusercontent.com/google/fonts/main/ofl
curl -sSLO "$base/instrumentserif/InstrumentSerif-Regular.ttf"
curl -sSLO "$base/instrumentserif/InstrumentSerif-Italic.ttf"
curl -sSL "$base/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf" -o jetbrainsmono-vf.ttf
curl -sSL "$base/archivo/Archivo%5Bwdth,wght%5D.ttf" -o archivo-vf.ttf

fonttools varLib.instancer archivo-vf.ttf wdth=100 wght=400:400:900 -o archivo.ttf
fonttools varLib.instancer jetbrainsmono-vf.ttf wght=400:600 -o jetbrainsmono.ttf

LATIN="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2212,U+2215,U+FEFF,U+FFFD"
LATINX="U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"

sub() { pyftsubset "$1" --output-file="$2" --flavor=woff2 --unicodes="$3" \
          --layout-features='*' --no-hinting --desubroutinize; }

sub archivo.ttf          archivo-latin.woff2                  "$LATIN,U+2191-2193"
sub archivo.ttf          archivo-latin-ext.woff2              "$LATINX"
sub jetbrainsmono.ttf    jetbrains-mono-latin.woff2           "$LATIN,U+2191-2193"
sub jetbrainsmono.ttf    jetbrains-mono-latin-ext.woff2       "$LATINX"
sub InstrumentSerif-Regular.ttf instrument-serif-latin.woff2         "$LATIN"
sub InstrumentSerif-Regular.ttf instrument-serif-latin-ext.woff2     "$LATINX"
sub InstrumentSerif-Italic.ttf  instrument-serif-italic-latin.woff2  "$LATIN"
sub InstrumentSerif-Italic.ttf  instrument-serif-italic-latin-ext.woff2 "$LATINX"
```

If you add a character to the copy that lives outside these ranges, it will
quietly render in a fallback face. Widen `LATIN` and regenerate.
