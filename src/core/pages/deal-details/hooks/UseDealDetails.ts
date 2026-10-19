'use client';
import { useRef, useState } from 'react';
export function useDealDetails() {
  const [tab, setTab] = useState(0);
  const [titleExpanded, setTitleExpanded] = useState(false);
  const [consultantOpen, setConsultantOpen] = useState(false);
  const [intermediariesOpen, setIntermediariesOpen] = useState(false);
  const consultantTriggerRef = useRef<HTMLButtonElement>(null);
  const intermediariesTriggerRef = useRef<HTMLButtonElement>(null);
  return {
    tab,
    setTab,
    titleExpanded,
    setTitleExpanded,
    consultantOpen,
    setConsultantOpen,
    intermediariesOpen,
    setIntermediariesOpen,
    consultantTriggerRef,
    intermediariesTriggerRef,
  };
}
