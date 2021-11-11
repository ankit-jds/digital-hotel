obj = [
    {
        order_id: 5,
        Name: 'Divya Tamboli',
        table_no: 7,
        order_list: {
            dish5: '2',
            dish4: '1',
            dish2: '3',
            dish1: '2'
        },
        dishes:[
                {
                    id:5,
                    Name: "Paneer",
                    Type: "Snack",
                    Price: 500,
                    Availability: 1
                },
                {
                    id:4,
                    Name: "roti",
                    Type: "Sack",
                    Price: 400,
                    Availability: 1
                },
                {
                    id:2,
                    Name: "IceCream",
                    Type: "Desert",
                    Price: 900,
                    Availability: 1
                },
                {
                    id:1,
                    Name: "Samosa",
                    Type: "Snack",
                    Price: 300,
                    Availability: 1
                }
            ]
    }
]
obj.forEach(element => {
    console.log(element.order_id);
    console.log(element.Name);
    console.log(element.table_no);
    element.dishes.forEach(dish=>{
        console.log("dish"+dish.id);
        console.log(element.order_list["dish"+dish.id]);
    })
});
console.log(obj, typeof (obj));