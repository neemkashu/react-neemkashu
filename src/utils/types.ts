import { Component, createRef } from 'react';

export type elementRef<T extends Element | Component> = ReturnType<typeof createRef<T>>;
