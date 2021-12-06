import { all, takeLatest } from "redux-saga/effects";
import { createContact } from "./contact";
import * as types from "@redux/types/contact";

export default function* createContactSage() {
  yield all([takeLatest(types.CREATE_CONTACT, createContact)]);
}
