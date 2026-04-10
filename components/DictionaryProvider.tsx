"use client";

import React, { createContext, useContext } from "react";

type DictionaryContextType = {
  dict: any;
  lang: string;
};

const DictionaryContext = createContext<DictionaryContextType | null>(null);

export function DictionaryProvider({
  children,
  dict,
  lang,
}: {
  children: React.ReactNode;
  dict: any;
  lang: string;
}) {
  return (
    <DictionaryContext.Provider value={{ dict, lang }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
}
