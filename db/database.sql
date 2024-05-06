drop database suscripcion;
create database suscripcion;

use suscripcion;

create table tipo_suscripcion (
	id_tipo_suscripcion int primary key auto_increment,
    nombre_tipo_suscripcion varchar(25), 
    descripcion_tipo_suscripcion varchar(150), 
    duracion_tipo_suscripcion int, 
    precio_tipo_suscripcion double
);

create table suscripcion_usuario (
	id_usuario int,
    id_tipo_suscripcion int, 
    fecha_inicio_suscripcion date, 
    fecha_fin_suscripcion date null, 
    estado_suscripcion boolean, 
    constraint fk_tipo_suscripcion foreign key (id_tipo_suscripcion) references tipo_suscripcion(id_tipo_suscripcion)
);

insert into tipo_suscripcion values (null,"Free","Suscripciòn por defecto",1, 55.0);
insert into suscripcion_usuario values (25,1, "2024-10-1", "2024-10-30", false);

select * from tipo_suscripcion;
select * from suscripcion_usuario;