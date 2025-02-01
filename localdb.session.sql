select p.postingid,
       p.title,
       a.applicationid,
       a.dateapplied,
       s.emailaddress
 from jobs.application a,
      jobs.posting p,
      jobs.user s,
      jobs.user u
where a.postingid = p.postingid 
  and a.studentid = s.userid
  and p.employerid = u.userid
  and u.userid = $1