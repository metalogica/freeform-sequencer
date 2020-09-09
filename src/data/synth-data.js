import { MembraneSynth, MetalSynth, AMSynth, MonoSynth } from 'tone'
import firebase from 'firebase/app'
import 'firebase/storage'

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

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCaC47Uiu6JN0HM38StwBfOFE5LCoXpL4",
  authDomain: "samplersequencer.firebaseapp.com",
  databaseURL: "https://samplersequencer.firebaseio.com",
  projectId: "samplersequencer",
  storageBucket: "samplersequencer.appspot.com",
  messagingSenderId: "594679633001",
  appId: "1:594679633001:web:3954ed93de15067e3afef8",
  measurementId: "G-2WBTZ2QF79"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.storage()

export let drumSounds = []
const drumref = firestore.ref('DrumSounds')
drumref.listAll().then(function(res) {
  res.items.forEach(function(itemRef) {
    drumSounds.push(itemRef.name.split(".")[0])
  });
}).catch(function(error) {
  console.log(error)
});

export let citizenDjSounds = []
const citizenref = firestore.ref('CitizenDJ/Dialect Samples')
citizenref.listAll().then(function(res) {
  res.items.forEach(function(itemRef) {
    citizenDjSounds.push(itemRef.name.split("_afccal")[0])
  });
}).catch(function(error) {
  console.log(error)
});
