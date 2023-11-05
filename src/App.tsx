import { ChangeEvent, useState } from "react";
import styles from "./home.module.css";
import { IData } from "./interface/index.ts";
import { data } from "./constants/index.ts";

const App = (): JSX.Element => {
  const [title, setTitle] = useState<string>();
  const [arr, setArr] = useState<IData[]>(data);

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>): void => {
    setTitle(evt.target.value);
  };

  const handleSubmit = (): void => {
    if (!title?.length) return;
    const newData = {
      id: new Date().getTime(),
      title: title,
      description: "Best",
    };
    setArr([...arr, newData]);
    setTitle("");
  };

  const deleteItem = (id: number): void => {
    const newData = arr.filter((c) => c.id != id);
    setArr(newData);
  };
  const editItem = (value: string, id: number): void => {
    const val = prompt("Edit Item", value);
    const newData = arr.map((item) => {
      if (item.id == id) {
        if (val != null) {
          item.title = val;
          return { ...item };
        }
        return item;
      }
      return item;
    });
    setArr(newData);
  };

  return (
    <>
      <div className={styles.todo}>
        <h1 className={styles.title}>App tsx todo</h1>
        <input
          type="text"
          placeholder="Name item..."
          value={title}
          onChange={changeHandler}
          className={styles.input}
        />
        <button onClick={handleSubmit} className={styles.button_add}>
          Add to do
        </button>
      </div>
      <div className={styles.card}>
        {arr.length > 0 ? (
          arr.map((item) => {
            return (
              <div key={item.id} className={styles.card_item}>
                <p>{item.title}</p>

                <div className={styles.delBtn}>
                  <button onClick={() => deleteItem(item.id)}>Del</button>
                  <button onClick={() => editItem(item.title, item.id)}>
                    Edit
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1 style={{ textAlign: "center" }}>No Item :(</h1>
        )}
      </div>
    </>
  );
};

export default App;
