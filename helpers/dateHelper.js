

   export function getDateInFuture() {
       const today = new Date();
       const futureDate =  new Date();
       futureDate.setDate(today.getDate() + 30);
       return  futureDate.toISOString().split("T")[0];
   }