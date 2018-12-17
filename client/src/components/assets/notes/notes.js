import c3 from "../notes/c3/c.wav";
import d3 from "../notes/c3/d.wav";
import e3 from "../notes/c3/e.wav";
import f3 from "../notes/c3/f.wav";
import g3 from "../notes/c3/g.wav";
import a3 from "../notes/c3/a.wav";
import b3 from "../notes/c3/b.wav";
import c4 from "../notes/c4/c.wav";
import d4 from "../notes/c4/d.wav";
import e4 from "../notes/c4/e.wav";
import f4 from "../notes/c4/f.wav";
import g4 from "../notes/c4/g.wav";
import a4 from "../notes/c4/a.wav";
import b4 from "../notes/c4/b.wav";
import c5 from "../notes/c5/c.wav";
import d5 from "../notes/c5/d.wav";
import e5 from "../notes/c5/e.wav";
import f5 from "../notes/c5/f.wav";
import g5 from "../notes/c5/g.wav";
import a5 from "../notes/c5/a.wav";
import b5 from "../notes/c5/b.wav";

const all = [
  { name: "C", sound: c3 },
  { name: "D", sound: d3 },
  { name: "E", sound: e3 },
  { name: "F", sound: f3 },
  { name: "G", sound: g3 },
  { name: "A", sound: a3 },
  { name: "B", sound: b3 },
  { name: "C", sound: c4 },
  { name: "D", sound: d4 },
  { name: "E", sound: e4 },
  { name: "F", sound: f4 },
  { name: "G", sound: g4 },
  { name: "A", sound: a4 },
  { name: "B", sound: b4 },
  { name: "C", sound: c5 },
  { name: "D", sound: d5 },
  { name: "E", sound: e5 },
  { name: "F", sound: f5 },
  { name: "G", sound: g5 },
  { name: "A", sound: a5 },
  { name: "B", sound: b5 }
];

const twoOctaves = [
  { name: "C", sound: c3 },
  { name: "D", sound: d3 },
  { name: "E", sound: e3 },
  { name: "F", sound: f3 },
  { name: "G", sound: g3 },
  { name: "A", sound: a3 },
  { name: "B", sound: b3 },
  { name: "C", sound: c4 },
  { name: "D", sound: d4 },
  { name: "E", sound: e4 },
  { name: "F", sound: f4 },
  { name: "G", sound: g4 },
  { name: "A", sound: a4 },
  { name: "B", sound: b4 }
];

const octaves = {
  c3: [
    { name: "C", sound: c3 },
    { name: "D", sound: d3 },
    { name: "E", sound: e3 },
    { name: "F", sound: f3 },
    { name: "G", sound: g3 },
    { name: "A", sound: a3 },
    { name: "B", sound: b3 }
  ],
  c4: [
    { name: "C", sound: c4 },
    { name: "D", sound: d4 },
    { name: "E", sound: e4 },
    { name: "F", sound: f4 },
    { name: "G", sound: g4 },
    { name: "A", sound: a4 },
    { name: "B", sound: b4 }
  ],
  c5: [
    { name: "C", sound: c5 },
    { name: "D", sound: d5 },
    { name: "E", sound: e5 },
    { name: "F", sound: f5 },
    { name: "G", sound: g5 },
    { name: "A", sound: a5 },
    { name: "B", sound: b5 }
  ]
};

export { all, octaves, twoOctaves };
