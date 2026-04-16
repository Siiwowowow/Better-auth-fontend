"use client";

import React, { Suspense } from 'react'
import { GoogleLoginSuccess } from '@/components/GoogleLoginSuccess';

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <GoogleLoginSuccess />
      </Suspense>
      <div>
        
      </div>
    </>
  )
}
