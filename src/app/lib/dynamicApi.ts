// lib/api/subscribe.ts
export interface Subscriber {
  EntityTypeId: number;
  Email: string;
  FirstName?: string;
  LastName?: string;
  NewsType?: string;
}

export async function DynamicApi(subscriber: Subscriber): Promise<Response> {
  const res = await fetch(
    "https://portal.mawarid.com.sa/SystemApi/api/v1/entitytype/insert",
    {
      method: "POST",
      headers: {
        area: "System",
        environmentcode: "Live",
        appcode: "App0000009",
        "user-Id": "System",
        username: "System",
        companycode: "Mawarid",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJDdXN0b21lcklkIjoiQ3VzMDAwMDAxNiIsIkN1c3RvbWVyQ29kZSI6Ik1hd2FyaWQiLCJFbnZpcm9ubWVudElkIjoiRW52MDAwMDAxMyIsIkVudmlyb25tZW50Q29kZSI6IkxpdmUiLCJFbnZpcm9ubWVudE1hcHBpbmdzIjoiRW52MDAwMDAxMzpMaXZlIiwiQ29tcGFueUlkIjoiQ29tMDAwMDAxNCIsIkNvbXBhbnlDb2RlIjoiTWF3YXJpZCIsIkNvbXBhbnlNYXBwaW5ncyI6IkNvbTAwMDAwMTQ6TWF3YXJpZCIsIkFwcE5hbWUiOiJBVFMiLCJBcHBDb2RlIjoiQXBwMDAwMDAwOSIsIkFwcE1hcHBpbmdzIjoiQVRTOkFwcDAwMDAwMDksSW50ZXJuYWxTeXN0ZW06QXBwMDAwMDAwNCIsInN0YXR1cyI6IlRydWUiLCJtc2ciOiJMb2dpbiBTdWNjZXNzRnVsbHkiLCJVc2VyTmFtZSI6IlN5c3RlbSIsIk5hbWUiOiJTeXN0ZW0iLCJBcmVhIjoiU3lzdGVtIiwiVXNlclR5cGUiOiIxIiwiRW1wbG95ZWVJZCI6IlN5c3RlbSIsImV4cCI6MTg3Nzc1NjQ5MywiaXNzIjoiY2VudGVyLnBvaW50LmNvbSIsImF1ZCI6ImNlbnRlci5wb2ludC5jb20ifQ.u8v3WC427vL7rr1EgClvGEkHetNsXJdDQL1MMGruXpA",
      },
      body: JSON.stringify(subscriber),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to submit subscription: ${res.status}`);
  }

  return res;
}
