# Template: Vercel Project Configuration

## Source File
`.vercel/project.json`

## Category
ROOT - Deployment Configuration

## Purpose
Vercel-Projektkonfiguration mit Projekt-ID und Organisation-ID für Deployment.

## Template

```json
{
  "projectId": "{{PROJECT_ID}}",
  "orgId": "{{ORG_ID}}",
  "projectName": "{{PROJECT_NAME}}"
}
```

## Fields

| Field | Description | Example |
|-------|-------------|---------|
| `projectId` | Eindeutige Projekt-ID bei Vercel | `prj_xxxxxxxxxxxx` |
| `orgId` | Organisations-ID bei Vercel | `team_xxxxxxxxxxxx` |
| `projectName` | Name des Projekts | `my-project-name` |

## Usage Notes
- Diese Datei wird von Vercel CLI automatisch erstellt
- Enthält sensitive IDs - nicht committen oder teilen
| Für Team-Deployments notwendig |

## Source Reference
```json
{"projectId":"prj_Rxlzx31oPdHOQUQ4UH1ml0DF2VNk","orgId":"team_RnfGmrOYJv6t0yNOcIpPsmjF","projectName":"magwarm-flow"}
```
