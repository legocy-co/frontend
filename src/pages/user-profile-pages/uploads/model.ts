import { createGate } from 'effector-react';
import { createEvent, createStore } from 'effector';
import { MarketItem } from '../../../types/MarketItemType.ts';

export const gate = createGate();

export const $status = createStore<string>('ACTIVE');

export const $marketItems = createStore<MarketItem[]>([]);

export const setStatus = createEvent<string>();
