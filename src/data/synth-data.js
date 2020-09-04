import { MembraneSynth, MetalSynth, AMSynth, MonoSynth } from "tone"

// Init Synths
export const Memsynth = new MembraneSynth().toDestination()
export const MetSynth = new MetalSynth().toDestination()
export const AmSynth = new AMSynth().toDestination()
export const MonSynth = new MonoSynth().toDestination()

// Synth Data
export const notes = [
  { value: 'A', label: 'A' },
  { value: 'A#', label: 'A#' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'C#', label: 'C#' },
  { value: 'D', label: 'D' },
  { value: 'D#', label: 'D#' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'F#', label: 'F#' },
  { value: 'G', label: 'G' },
  { value: 'G#', label: 'G#' },
]

export const octaves = [
  { value: '0', label: '0', },
  { value: '1', label: '1', },
  { value: '2', label: '2', },
  { value: '3', label: '3', },
  { value: '4', label: '4', },
  { value: '5', label: '5', },
  { value: '6', label: '6', },
  { value: '7', label: '7', },
  { value: '8', label: '8', },
]

export const synths = [
  { value: Memsynth, label: 'Membrane' },
  { value: MetSynth, label: 'Metallic' },
  { value: AmSynth, label: 'AM' },
  { value: MonSynth, label: 'Mono' },
]
