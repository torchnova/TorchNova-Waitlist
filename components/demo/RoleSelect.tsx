"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DEMO_ROLES } from "@/lib/validation";

/** One line of context under each role, so the choice is easy to make. */
const HINTS: Record<(typeof DEMO_ROLES)[number], string> = {
  "Founder / Co-founder": "Starting or running a company",
  Executive: "Leading a function or business",
  "Operator / Team lead": "Running teams and day-to-day work",
  Investor: "Backing early-stage companies",
  "Accelerator / Program": "Supporting a cohort of founders",
  Other: "Something else",
};

interface RoleSelectProps {
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

/**
 * Listbox-pattern select: a field-styled trigger that opens a menu card.
 * Keyboard: ↑/↓/Home/End move, Enter/Space choose, Esc/Tab close,
 * typing a letter jumps to the next matching role.
 */
export function RoleSelect({ id, value, error, onChange }: RoleSelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const errId = error ? `${id}-error` : undefined;

  const openMenu = () => {
    const i = DEMO_ROLES.indexOf(value as (typeof DEMO_ROLES)[number]);
    setActive(i >= 0 ? i : 0);
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };
  const choose = (i: number) => {
    onChange(DEMO_ROLES[i]!);
    close();
  };

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function onListKey(e: React.KeyboardEvent) {
    const last = DEMO_ROLES.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(last, a + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const k = e.key.toLowerCase();
          const order = [...DEMO_ROLES.keys()].map((n) => (active + 1 + n) % DEMO_ROLES.length);
          const hit = order.find((n) => DEMO_ROLES[n]!.toLowerCase().startsWith(k));
          if (hit !== undefined) setActive(hit);
        }
    }
  }

  return (
    <div className="field" ref={rootRef}>
      <label id={`${id}-label`} htmlFor={id}>
        Your role
      </label>
      <div className="select">
        <button
          ref={buttonRef}
          id={id}
          type="button"
          className={`select-trigger${value ? "" : " placeholder"}${error ? " invalid" : ""}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={`${id}-label ${id}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={errId}
          onClick={() => (open ? close(false) : openMenu())}
          onKeyDown={(e) => {
            if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
              e.preventDefault();
              openMenu();
            }
          }}
        >
          <span>{value || "Select your role"}</span>
          <svg className="select-chevron" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>

        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={open ? `${listId}-${active}` : undefined}
          className={`select-menu${open ? " is-open" : ""}`}
          hidden={!open}
          onKeyDown={onListKey}
        >
          {DEMO_ROLES.map((r, i) => (
            <li
              key={r}
              id={`${listId}-${i}`}
              data-index={i}
              role="option"
              aria-selected={value === r}
              className={`select-option${i === active ? " is-active" : ""}`}
              onPointerMove={() => setActive(i)}
              onClick={() => choose(i)}
            >
              <span className="select-option-text">
                <span>{r}</span>
                <span className="select-option-hint">{HINTS[r]}</span>
              </span>
              {value === r ? (
                <svg className="select-check" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2.5 6.2 5 8.7 9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      {error ? (
        <span className="field-error" id={errId}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
