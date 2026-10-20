# Formats and troubleshooting

Squash decodes and encodes AVIF, JPEG (`.jpg` or `.jpeg`), JPEG XL (`.jxl`), PNG,
and WebP. The file picker can show other image types, but those are not supported
by the codec pipeline.

| Output | Initial quality control | Behavior |
| --- | --- | --- |
| AVIF | 50 | The current encoder uses codec defaults; the slider is not passed through. |
| JPEG | 75 | Quality is passed to the JPEG encoder. |
| JPEG XL | 75 | Quality is passed to the JPEG XL encoder. |
| PNG | None | Lossless encoding; no quality slider. |
| WebP | 75 | Quality is passed to the WebP encoder. |

Lower quality generally reduces size and detail, but results depend on the input.
Compare the downloaded result with your original. Browser preview support varies
by format: a missing JPEG XL preview does not necessarily mean encoding failed.
The app does not provide animation or metadata-preservation controls.

## Common problems

- **Unsupported format:** convert the source to a supported format first. GIF,
  SVG, HEIC, and other formats are not decoded by this app.
- **Empty or invalid image:** check that the original opens elsewhere and is not
  zero bytes. Renaming an extension does not convert its contents.
- **Codec failed to load:** reload and check that the host serves the JavaScript
  and `.wasm` assets. See [hosting](releases.md#hosting).
- **Slow processing or browser memory pressure:** try fewer or smaller images.
  Decoding expands compressed files into pixels in memory.
- **Output larger than input:** try another format or lower quality. Already
  optimized images may not shrink further.
- **Settings seem unchanged:** set options before uploading a fresh batch. For
  AVIF, the quality slider currently has no effect.
