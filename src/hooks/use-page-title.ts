"use client";

import { useEffect } from "react";

const SITE_NAME = "BookNook";
const DEFAULT_TITLE = `${SITE_NAME} — A Modern Community Library`;

export function usePageTitle(title?: string) {
  const next = title ? `${SITE_NAME} | ${title}` : DEFAULT_TITLE;

  useEffect(() => {
    if (document.title !== next) document.title = next;
  });
}
