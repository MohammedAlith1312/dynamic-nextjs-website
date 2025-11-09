// app/not-found.tsx
import React from "react";
export const dynamic = 'force-dynamic';
interface NotFoundProps {
  is404?: boolean;
}

export default function NotFound({ is404 }: NotFoundProps) {
  return (
    <div className="Notfound h-screen">
   <div id="header"><h1>Server Error</h1></div>
   <div id="content">
 <div className="content-container"><fieldset>
  <h2>404 - File or directory not found.</h2>
  <h3>The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h3>
 </fieldset></div>
</div>
</div>
   
  );
}
