﻿// <auto-generated />
using System;
using ConcealedCommunication.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ConcealedCommunication.Migrations
{
    [DbContext(typeof(ConcealedCommunicationContext))]
    [Migration("20201228130613_messageblob")]
    partial class messageblob
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("ConcealedCommunication.Models.ConcealedAddress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("longtext");

                    b.Property<string>("OwnKey")
                        .HasColumnType("longtext");

                    b.Property<string>("ReadKey")
                        .HasColumnType("longtext");

                    b.Property<string>("WriteKey")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ConcealedAddress");
                });

            modelBuilder.Entity("ConcealedCommunication.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ConcealedAddressId")
                        .HasColumnType("int");

                    b.Property<byte[]>("Content")
                        .HasColumnType("longblob");

                    b.Property<string>("IV")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("ConcealedAddressId");

                    b.ToTable("Message");
                });

            modelBuilder.Entity("ConcealedCommunication.Models.RunTimeLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Milliseconds")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("RunTimeLog");
                });

            modelBuilder.Entity("ConcealedCommunication.Models.ServerOptions", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("DecryptKey")
                        .HasColumnType("longtext");

                    b.Property<string>("EncryptKey")
                        .HasColumnType("longtext");

                    b.Property<string>("SignKey")
                        .HasColumnType("longtext");

                    b.Property<string>("VerifyKey")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ServerOptions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DecryptKey = "b",
                            EncryptKey = "a",
                            SignKey = "c",
                            VerifyKey = "d"
                        });
                });

            modelBuilder.Entity("ConcealedCommunication.Models.Message", b =>
                {
                    b.HasOne("ConcealedCommunication.Models.ConcealedAddress", "ConcealedAddress")
                        .WithMany()
                        .HasForeignKey("ConcealedAddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ConcealedAddress");
                });
#pragma warning restore 612, 618
        }
    }
}
