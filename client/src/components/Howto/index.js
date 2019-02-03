import React from "react";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";

const Howto = () => {
  return (
    <div className="container">
      <h2>How to practice ear training</h2>

      <Collapsible accordion defaultActiveKey={0}>
        <CollapsibleItem
          header="Increase practice frequency, not
            duration."
          icon="info"
        >
          Who would improve faster: Stu, who practices once a week for 4 hours
          straight, or Merle, who practices every day for 20 minutes? I'd bet on
          Merle, even though Stu spends almost twice as much time practicing.
          This is because, after you've spent time practicing something, your
          brain continues to work on it and make new neural connections in the
          background, even while sleeping (especially while sleeping!). For this
          reason, I recommend bookmarking your favorite exercises and doing them
          every day for a set amount of time.
        </CollapsibleItem>
        <CollapsibleItem
          header="Start simple and gradually
            increase difficulty."
          icon="info"
        >
          Who would improve faster: Stu, who jumps straight to the hardest
          difficulty on the chord progressions exercise, or Merle, who starts
          with just easy intervals, then adds one more interval (first the
          simple intervals, then the more complex) whenever his accuracy is
          above 90% for three days in a row? Again, my money's on Merle.
          Practice should be challenging, but not so challenging that you're
          overwhelmed.
        </CollapsibleItem>
        <CollapsibleItem header="Track you progress" icon="info">
          You can track your progress by the precentage of your success in each
          game(and difficulty). This lets you know for sure whether you're
          improving. If you can see your improvement, this will encourage you to
          keep going. It can also help you notice when you're plateauing so that
          you can look for the cause. Are you not practicing often enough? Did
          you increase difficulty too quickly?
        </CollapsibleItem>
        <CollapsibleItem header="Sing scales and intervals." icon="info">
          The exercises on this site all involve identifying notes rather than
          generating them, but that doesn't mean you shouldn't sing along with
          them. Try singing up from the root note to any given scale degree.
        </CollapsibleItem>
        <CollapsibleItem
          header="Transcribe music with your
            instrument."
          icon="info"
        >
          Pick your favorite songs and figure them out on your instrument. You
          can start with the melody and then try to figure out the chords, or
          you can start with the chords and then try to figure out the melody.
          Practice both ways.
        </CollapsibleItem>
      </Collapsible>
    </div>
  );
};
export default Howto;
