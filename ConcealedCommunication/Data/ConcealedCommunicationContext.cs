using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ConcealedCommunication.Models;

namespace ConcealedCommunication.Data
{
    public class ConcealedCommunicationContext : DbContext
    {
        public ConcealedCommunicationContext (DbContextOptions<ConcealedCommunicationContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ServerOptions>().HasData(
                new ServerOptions
                {
                    Id = 1,
                    EncryptKey = "a",
                    DecryptKey = "b",
                    SignKey = "c",
                    VerifyKey = "d"
                }
            );
        }


        public DbSet<ConcealedAddress> ConcealedAddress { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<ServerOptions> ServerOptions { get; set; }
        public DbSet<RunTimeLog> RunTimeLog { get; set; }
    }
}
