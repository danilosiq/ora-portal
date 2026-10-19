'use client';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
export const Dialog=DialogPrimitive.Root;
export const DialogTitle=DialogPrimitive.Title;
export const DialogDescription=DialogPrimitive.Description;
export function DialogContent({children,className,...props}:React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>){return <DialogPrimitive.Portal><DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]"/><DialogPrimitive.Content className={cn('dialog-content fixed left-1/2 top-1/2 z-50 w-[calc(100%_-_2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 max-h-[90svh] overflow-y-auto rounded-xl bg-white p-7 shadow-xl outline-none',className)} {...props}>{children}<DialogPrimitive.Close className="absolute right-4 top-4 rounded p-1 text-neutral-500 hover:bg-neutral-100" aria-label="Fechar"><X size={18}/></DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal>;}
