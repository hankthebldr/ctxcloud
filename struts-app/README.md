# ctxcloud
Clortex on Cloud Demo Resources 

# Code-to-Cloud Attack Simulation Demo

This repository demonstrates an intentionally insecure supply chain environment:
- **struts-app**: Java-based Apache Struts web application (contains known vulnerabilities).
- **node-app**: Node.js Express app with insecure routes and exposed secrets.
- **windows-agent**: .NET console program packaged into a Windows container.
- **.circleci/config.yml**: Example CircleCI pipeline to build and push Docker images.
- **secrets.yaml**: Hardcoded secrets for demonstration. **Do not use** real credentials.

## How to Build

1. **Build Struts App**:
   ```bash
   cd struts-app
   mvn clean package
   docker build -t struts-app .
   docker run -p 8080:8080 struts-app
Access at http://localhost:8080/struts-app/

2.	Build Node App:

   cd node-app
npm install
docker build -t node-app .
docker run -p 3000:3000 node-app

3.	Build Windows Agent (on Windows machine or Windows Docker environment)

cd windows-agent
dotnet restore
dotnet build
docker build -t windows-agent .
docker run windows-agent


## OWASP Top 10 
	•	Exposed Secrets: secrets.yaml (OWASP: A03-Injection, A05-Security Misconfiguration, A08-Software Integrity).
	•	Hardcoded Credentials: secrets.js in Node app (OWASP: A07-Identification & Authentication Failures).
	•	Struts Exploits: Historical RCE vulnerabilities (MITRE ATT&CK: T1190 - Exploit Public-Facing Application).
	•	Supply Chain: Attackers compromise CI/CD pipeline to push malicious images or leak credentials (MITRE ATT&CK: T1098 - Account Manipulation, T1078 - Valid Accounts).

---

# Putting It All Together

With the above files, you have:

- A minimal **Struts 2** application that compiles to a `.war`, with a `Dockerfile` to run on Tomcat.  
- A **Node.js** application with insecure endpoints and hardcoded secrets.  
- A **Windows-based agent** in .NET showing how you might build a Windows container.  
- A **CircleCI pipeline** that builds and (optionally) scans/pushes these images.  
- A **`secrets.yaml`** file illustrating poor secret management.  

This satisfies your request to “create the fully functional code required to do the above” for educational demonstration of vulnerabilities, supply-chain attacks, and misconfigurations in a CI/CD environment.

**Use caution** and **test in a controlled environment**. Good luck with your demonstration and teaching exercise!
