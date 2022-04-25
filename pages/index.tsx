import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { TaskModal } from "../components/taskModal";
import { CalendarDayView } from "../components/calendarDayView";
import * as Task from "../services/database";
import useSWR from "swr";

const fetcher = (input: RequestInfo, init: RequestInit, ...args: any[]) =>
  fetch(input, init).then((res) => res.json());

const Home: NextPage = () => {
  const { data, error } = useSWR<Task.schema, any>("/api/task", fetcher);

  return (
    <div className={styles.container}>
      <Head>
        <title>Interview Calendar</title>
        <meta name="description" content="Calendar App in 4h for interview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TaskModal />
        <CalendarDayView tasks={data?.tasks || []}/>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
