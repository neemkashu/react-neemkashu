import { createRef } from 'react';

export type elementRef<T extends Element> = ReturnType<typeof createRef<T>>;
