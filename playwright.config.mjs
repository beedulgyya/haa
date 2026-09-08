import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir:"./tests", timeout:30000,
  use:{baseURL:"http://127.0.0.1:4173", screenshot:"only-on-failure"},
  webServer:{command:"python3 -m http.server 4173",port:4173,reuseExistingServer:!process.env.CI},
  projects:[
    {name:"1366x768",use:{...devices["Desktop Chrome"],viewport:{width:1366,height:768}}},
    {name:"1920x1080",use:{...devices["Desktop Chrome"],viewport:{width:1920,height:1080}}}
  ]
});
