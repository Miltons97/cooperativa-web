// scripts/createAdmin.js
const pool = require("../config/db"); 
const bcrypt = require("bcryptjs");

const createAdminUsersTable = async () => {
  const queryTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role VARCHAR(20) DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(queryTable);
    console.log("✅ Tabla usuarios creada correctamente");

    const usuarios = [
      // ===== SUPERADMIN (acceso total) =====
      { 
        email: "superadmin@copeospil.com", 
        password: "Super123!", 
        role: "superadmin",
        descripcion: "Acceso completo a todas las categorías"
      },
      
      // ===== ADMIN (Novedades e Inicio) =====
      { 
        email: "admin@copeospil.com", 
        password: "Admin123!", 
        role: "admin",
        descripcion: "Puede publicar en NOVEDADES e INICIO"
      },
      
      // ===== SERVICIOS (todos los servicios) =====
      { 
        email: "servicios@copeospil.com", 
        password: "Servicios123!", 
        role: "servicios",
        descripcion: "Puede publicar en AGUA, LUZ, INTERNET, SOCIAL"
      },
      
      // ===== USUARIOS POR SERVICIO ESPECÍFICO =====
      { 
        email: "agua@copeospil.com", 
        password: "Agua123!", 
        role: "agua",
        descripcion: "Solo puede publicar en AGUA"
      },
      { 
        email: "luz@copeospil.com", 
        password: "Luz123!", 
        role: "luz",
        descripcion: "Solo puede publicar en LUZ"
      },
      { 
        email: "internet@copeospil.com", 
        password: "Internet123!", 
        role: "internet",
        descripcion: "Solo puede publicar en INTERNET"
      },
      { 
        email: "social@copeospil.com", 
        password: "Social123!", 
        role: "social",
        descripcion: "Solo puede publicar en SOCIAL"
      },
      
      // ===== USUARIOS DE PRUEBA (opcional) =====
      { 
        email: "novedades@copeospil.com", 
        password: "Novedades123!", 
        role: "admin",
        descripcion: "Usuario dedicado solo a novedades"
      }
    ];

    for (const usuario of usuarios) {
      const hashedPassword = await bcrypt.hash(usuario.password, 10);

      const exists = await pool.query(
        "SELECT id FROM usuarios WHERE email = $1",
        [usuario.email]
      );

      if (exists.rows.length === 0) {
        await pool.query(
          `INSERT INTO usuarios (email, password, role)
           VALUES ($1, $2, $3)`,
          [usuario.email, hashedPassword, usuario.role]
        );
        console.log(`✅ Usuario ${usuario.email} creado`);
        console.log(`   Password: ${usuario.password}`);
        console.log(`   Role: ${usuario.role}`);
        console.log(`   Descripción: ${usuario.descripcion}`);
      } else {
        console.log(`⚠️  Usuario ${usuario.email} ya existe`);
      }
    }

    console.log("\n" + "=".repeat(70));
    console.log("🎉 PROCESO COMPLETADO - USUARIOS CREADOS");
    console.log("=".repeat(70));
    
    console.log("\n📋 TABLA DE CREDENCIALES Y PERMISOS:\n");
    
    console.log("┌─────────────────────────────────┬──────────────────┬─────────────────────────────────┐");
    console.log("│ EMAIL                           │ PASSWORD         │ PUEDE PUBLICAR EN               │");
    console.log("├─────────────────────────────────┼──────────────────┼─────────────────────────────────┤");
    
    const permisos = {
      superadmin: "TODAS LAS CATEGORÍAS",
      admin: "NOVEDADES, INICIO",
      servicios: "AGUA, LUZ, INTERNET, SOCIAL",
      agua: "AGUA",
      luz: "LUZ",
      internet: "INTERNET",
      social: "SOCIAL"
    };
    
    usuarios.forEach(u => {
      const email = u.email.padEnd(31);
      const pass = u.password.padEnd(16);
      const perms = permisos[u.role].padEnd(31);
      console.log(`│ ${email} │ ${pass} │ ${perms} │`);
    });
    
    console.log("└─────────────────────────────────┴──────────────────┴─────────────────────────────────┘");
    
    console.log("\n💡 RECOMENDACIONES:");
    console.log("   • Cambia las contraseñas después del primer login");
    console.log("   • El superadmin tiene acceso completo - usar con precaución");
    console.log("   • Cada servicio tiene su usuario dedicado para publicaciones");
    console.log("\n📝 PARA INICIAR SESIÓN:");
    console.log("   http://localhost:5173/admin/login");
    console.log("\n📚 PARA CREAR NOTICIA:");
    console.log("   http://localhost:5173/admin/noticias/nueva");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await pool.end();
  }
};

createAdminUsersTable();