# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.
select p.productName, c.categoryName
from [products] as p
inner join categories as c 
on p.categoryId = c.categoryId

>> show 77 records
### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.
select o.orderId, s.shipperName 
from [orders] as o
inner join shippers as s 
on o.shipperId = s.shipperId
where o.orderDate < '1997-01-09'

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.
select p.productName, d.quantity
from [products] as p
join orderDetails as d
on p.productId = d.productId
where d.orderId = 10251
order by p.productName

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.
select o.orderId as 'Order ID', c.customerName as 'Customer Name', e.lastName as 'Employee Last Name'
from [orders] as o
join customers as c on c.customerId = o.customerId
join employees as e on e.employeeId = o.employeeId
 
### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.
select c.categoryName, count(p.productName) as 'Count'
from [categories] as c
join products as p on p.categoryId = c.categoryId
join orderDetails as d on d.productId = p.productId
group by c.categoryName

>> show 8 records only
### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 
select d.orderId, sum(d.quantity) as 'ItemCount'
from orderDetails as d
group by d.orderId