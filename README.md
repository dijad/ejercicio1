# ejercicio1

Ejercicio1 prueba Backend

Clonar el proyecto y ubicado en la terminal dentro del proyecto usar el comando `npm i` -> para instalar las dependencias `npm run dev` -> para ejecutar el proyecto

**Login con un usuario ADMIN para poder tener un token y realziar peticiones a los demás endpoints**

curl --request POST \
  --url http://localhost:5000/api/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "final@gmail.com",
	"password": "Contrasena123"
}'

Reemplazar el token con el obteniedo anteriormente donde sea necesario en las siguientes peticiones

**Agregar usuario**

curl --request POST
--url http://localhost:5000/api/users
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFETUlOIiwiaWF0IjoxNjk3MTU5NTk3LCJleHAiOjE2OTc3NjQzOTd9._LE19sXoaMJnKwaYjJGROy1HnNOHsxJrtjGgtjn47_U'
--header 'Content-Type: application/json'
--data '{ "name": "Fernando Gutierrez", "email": "cooldown@gmail.com", "password": "Contrasena123", "role": "CLIENT" }'

**Acá obtendrá todos los usuarios**

curl --request GET \
  --url http://localhost:5000/api/users \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFETUlOIiwiaWF0IjoxNjk3MTYwMzI2LCJleHAiOjE2OTc3NjUxMjZ9.QNhS4Ibt3jcjaPl8loOkcs2r3Kf72Hq0Dqf9iK-drNU' \
  --header 'Content-Type: application/json'

curl --request GET \
  --url 'http://localhost:5000/api/users?filtered_by=email&value_filter=final%40gmail.com' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFETUlOIiwiaWF0IjoxNjk3MTYwMzI2LCJleHAiOjE2OTc3NjUxMjZ9.QNhS4Ibt3jcjaPl8loOkcs2r3Kf72Hq0Dqf9iK-drNU' \
  --header 'Content-Type: application/json'

curl --request GET \
  --url 'http://localhost:5000/api/users?filtered_by=name&value_filter=Diego%20S%C3%A1nchez' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFETUlOIiwiaWF0IjoxNjk3MTYwMzI2LCJleHAiOjE2OTc3NjUxMjZ9.QNhS4Ibt3jcjaPl8loOkcs2r3Kf72Hq0Dqf9iK-drNU' \
  --header 'Content-Type: application/json'

**Aca puede borrar un usuario**, peude borrar el identificador 5 o el agregado previamente, para ver el id puede usar la lista de usuarios

curl --request DELETE
--url http://localhost:5000/api/users/4
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFETUlOIiwiaWF0IjoxNjk3MTYwMzI2LCJleHAiOjE2OTc3NjUxMjZ9.QNhS4Ibt3jcjaPl8loOkcs2r3Kf72Hq0Dqf9iK-drNU'
--header 'Content-Type: application/json'

**Editar un usuario**

curl --request PUT
--url http://localhost:5000/api/users/5
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFETUlOIiwiaWF0IjoxNjk3MTYwMzI2LCJleHAiOjE2OTc3NjUxMjZ9.QNhS4Ibt3jcjaPl8loOkcs2r3Kf72Hq0Dqf9iK-drNU'
--header 'Content-Type: application/json'
--data '{ "name": "Fer Gu", "email": "email@email.com" }'

**Obtener un usuario por id especifico**

curl --request GET
--url http://localhost:5000/api/users/5
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFETUlOIiwiaWF0IjoxNjk3MTYwMzI2LCJleHAiOjE2OTc3NjUxMjZ9.QNhS4Ibt3jcjaPl8loOkcs2r3Kf72Hq0Dqf9iK-drNU'
--header 'Content-Type: application/json'
