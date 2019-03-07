import React from "react";
import styles from "./Bio.module.css";
import { getGravatarURL } from "../utils/getGravatarURL";

interface BioProps {
  className?: string;
}

function Bio(props: BioProps) {
  let photoURL = getGravatarURL({
    email: "zhigang1992@gmail.com",
    size: 56
  });

  return (
    <div
      className={`
      ${styles.Bio}
      ${props.className || ""}
    `}
    >
      <img src={photoURL} alt="Me" />
      <p>
        Personal blog by{" "}
        <a href="https://twitter.com/zhigang1992/">Kyle Fang</a>.
        <br />
        Built with{" "}
        <a href="https://github.com/frontarm/create-react-blog">
          create-react-blog
        </a>
        , and themed from <a href="https://overreacted.io">overreacted</a>
      </p>
    </div>
  );
}

export default Bio;
