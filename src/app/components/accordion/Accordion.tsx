"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Accordion.module.css";

type AccordionProps = {
  buttonName: string;
  panelName: string;
  open?: boolean;
  title: React.ReactNode;
  icon?: React.ReactNode;
  content: React.ReactNode;
};

export default function Accordion({ buttonName, panelName, open = false, title, icon, content }: AccordionProps) {
  const accordionTrigger = useRef<HTMLButtonElement | null>(null);
  const accordionBody = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    if (accordionBody.current && !open) {
      accordionBody.current.setAttribute("hidden", "until-found");
    }
  }, [open]);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach(() => {
        if (accordionBody.current && accordionTrigger.current && !accordionBody.current.getAttribute("hidden") && accordionTrigger.current.getAttribute("aria-expanded") === "false") {
          setIsOpen((prev) => !prev);
        }
      });
    });

    if (accordionBody.current) {
      observer.observe(accordionBody.current, { attributes: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const changeExpanded = () => {
    setIsOpen((prev) => !prev);
    if (accordionBody.current) {
      if (!isOpen) {
        accordionBody.current.removeAttribute("hidden");
      } else {
        setTimeout(() => {
          accordionBody.current?.setAttribute("hidden", "until-found");
        }, 300);
      }
    }
  };

  return (
    <>
      <button id={buttonName} ref={accordionTrigger} className={styles.accordionTrigger} aria-expanded={isOpen} role="tab" aria-controls={panelName} type="button" onClick={changeExpanded}>
        {title}
        {icon}
      </button>
      <div id={panelName} ref={accordionBody} className={styles.accordionBody} role="tabpanel" aria-labelledby={buttonName}>
        <div className={styles.accordionInner}>{content}</div>
      </div>
    </>
  );
}
