import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";

export interface TimeLog {
  id: string;
  userId: string;
  taskName: string;
  startTime: Timestamp;
  endTime: Timestamp;
  duration: number; // in seconds
}

export interface TimeLogInput {
  userId: string;
  taskName: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
}

const timeLogsCollection = collection(db, "timeLogs");

// Add a new time log
export const addTimeLog = (log: TimeLogInput) => {
  return addDoc(timeLogsCollection, {
    ...log,
    startTime: Timestamp.fromDate(log.startTime),
    endTime: Timestamp.fromDate(log.endTime),
  });
};

// Get real-time updates for a user's time logs
export const getTimeLogsStream = (
  userId: string,
  callback: (logs: TimeLog[]) => void
) => {
  const q = query(
    timeLogsCollection,
    where("userId", "==", userId),
    orderBy("startTime", "desc")
  );
  return onSnapshot(q, (querySnapshot) => {
    const logs: TimeLog[] = [];
    querySnapshot.forEach((doc) => {
      logs.push({ id: doc.id, ...doc.data() } as TimeLog);
    });
    callback(logs);
  });
};

// Get all time logs for a user (for AI recommendations)
export const getAllTimeLogs = async (userId: string) => {
    const q = query(
        timeLogsCollection,
        where("userId", "==", userId),
        orderBy("startTime", "desc")
    );
    const querySnapshot = await getDocs(q);
    const logs: TimeLog[] = [];
    querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() } as TimeLog);
    });
    return logs;
}

// Delete a time log
export const deleteTimeLog = (id: string) => {
  const docRef = doc(db, "timeLogs", id);
  return deleteDoc(docRef);
};
