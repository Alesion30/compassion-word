import { Component, createEffect, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import axios from "axios";

const fetch = async (text: string) => {
  const result = await axios.get<string>(`http://localhost:5500?text=${text}`);
  console.log(result);
  return result.data;
};

const App: Component = () => {
  const [result, setResult] = createSignal<string>("");

  createEffect(async () => {
    const text = await fetch("こんにちは");
    setResult(text);
  });

  return (
    <div class={styles.App}>
      <p>絵文字つきメッセージを生成</p>
      <p>{result()}</p>
    </div>
  );
};

export default App;
