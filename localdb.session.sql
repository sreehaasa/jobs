select p.postingid,
 p.title,
 p.pathway,
 p.responsibilities,
 p.category,
 p.skills,
 p.salary,
 p.dateposted,
 p.status,
 e.username
 from jobs.posting p,
 jobs.user e
 where p.employerid = e.userid
 and p.status = 'Approved'
 

/*SELECT p.postingid,
  p.title,
  a.applicationid,
  a.status,
  a.dateapplied,
  e.username
FROM jobs.application a,
  jobs.posting p,
  jobs.user s,
  jobs.user e
WHERE a.postingid = p.postingid
  AND p.employerid = e.userid
  AND a.studentid = s.userid
  AND s.userid = 2
  */