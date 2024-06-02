## Web Explorer for OCL (Object Constraint Language)
<img width="1440" alt="Screenshot 2024-06-02 at 18 36 51" src="https://github.com/it1shka/ocl-explorer/assets/58363010/49584115-b5b4-4ccb-91c4-fa50fe1478c1">

## Motivation
Object Constraint Language (OCL) is studied at universities across the world,
yet there are no lightweight tools to experiment with the language. I tried to 
fill that gap by creating a web application allowing users to write short 
programs in javascript / typescript and verify them using OCL syntax

## How to use
OCL features list can be found here: [OCL.js Reference](https://ocl.stekoe.de)
I suggest you to pack your code into classes with proper field __typeName__ 
(OCL.js uses typeName to infer match object types to appropriate contexts).
After that, you can use builtin __verify(obj)__ function to verify
instances of those classes

## Online hosted version is coming soon!
