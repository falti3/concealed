using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConcealedCommunication.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using ConcealedCommunication.Data;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Jering.Javascript.NodeJS;

namespace ConcealedCommunication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // Add node js

            services.AddNodeJS();
            ServiceProvider serviceProvider = services.BuildServiceProvider();
            INodeJSService nodeJSService = serviceProvider.GetRequiredService<INodeJSService>();

            //services.AddDbContext<ConcealedCommunicationContext>(options =>
            //    options.UseMySQL(Configuration.GetConnectionString("ConcealedCommunicationContext"))
            //);

            services.AddDbContextPool<ConcealedCommunicationContext>(
                dbContextOptions => dbContextOptions
                    .UseMySql(
                        // Replace with your connection string.
                        "server=127.0.0.1,port=3306;uid=fabian;password=Fabian123!;database=concealed1",
                        // Replace with your server version and type.
                        // For common usages, see pull request #1233.
                        new MySqlServerVersion(new Version(8, 0, 21)), // use MariaDbServerVersion for MariaDB
                        mySqlOptions => mySqlOptions
                            .CharSetBehavior(CharSetBehavior.NeverAppend))
                    // Everything from this point on is optional but helps with debugging.
                    .EnableSensitiveDataLogging()
                    .EnableDetailedErrors());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
