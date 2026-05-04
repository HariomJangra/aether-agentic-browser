#pragma once
#include <windows.h>
#include <string>

class ServerProcessManager {
private:
    HANDLE m_jobHandle;
    HANDLE m_processHandle;
    
public:
    ServerProcessManager() : m_jobHandle(NULL), m_processHandle(NULL) {
        m_jobHandle = CreateJobObject(NULL, NULL);
        if (m_jobHandle) {
            JOBOBJECT_EXTENDED_LIMIT_INFORMATION jeli = { 0 };
            jeli.BasicLimitInformation.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE;
            SetInformationJobObject(m_jobHandle, JobObjectExtendedLimitInformation, &jeli, sizeof(jeli));
        }
    }

    ~ServerProcessManager() {
        if (m_processHandle) CloseHandle(m_processHandle);
        if (m_jobHandle) CloseHandle(m_jobHandle);
    }

    bool StartServer(const std::wstring& commandLine, const std::wstring& workingDirectory) {
        if (!m_jobHandle) return false;

        STARTUPINFOW si = { sizeof(si) };
        si.dwFlags = STARTF_USESHOWWINDOW;
        si.wShowWindow = SW_HIDE; 

        PROCESS_INFORMATION pi = { 0 };
        std::wstring cmdMutable = commandLine;

        BOOL success = CreateProcessW(
            NULL, 
            &cmdMutable[0], 
            NULL, 
            NULL, 
            FALSE, 
            CREATE_NO_WINDOW | CREATE_BREAKAWAY_FROM_JOB, 
            NULL, 
            workingDirectory.empty() ? NULL : workingDirectory.c_str(), 
            &si, 
            &pi 
        );

        if (success) {
            AssignProcessToJobObject(m_jobHandle, pi.hProcess);
            m_processHandle = pi.hProcess;
            CloseHandle(pi.hThread); 
            return true;
        }

        return false;
    }
};
