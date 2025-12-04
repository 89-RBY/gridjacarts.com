<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Gridjac Arts - XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
          }
          header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
          }
          header h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
          header p {
            opacity: 0.9;
            font-size: 1rem;
          }
          .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            padding: 2rem;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
          }
          .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .stat-card h3 {
            color: #667eea;
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
          .stat-card p {
            color: #6c757d;
            font-size: 0.875rem;
          }
          .content {
            padding: 2rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
          }
          thead {
            background: #f8f9fa;
            position: sticky;
            top: 0;
          }
          th {
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            color: #495057;
            border-bottom: 2px solid #dee2e6;
          }
          td {
            padding: 1rem;
            border-bottom: 1px solid #e9ecef;
          }
          tr:hover {
            background: #f8f9fa;
          }
          .url-cell {
            color: #667eea;
            text-decoration: none;
            word-break: break-all;
          }
          .url-cell:hover {
            text-decoration: underline;
          }
          .priority-high {
            color: #28a745;
            font-weight: 600;
          }
          .priority-medium {
            color: #ffc107;
            font-weight: 600;
          }
          .priority-low {
            color: #6c757d;
          }
          .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
          }
          .badge-monthly {
            background: #e7f5ff;
            color: #1971c2;
          }
          .badge-weekly {
            background: #fff3e0;
            color: #e65100;
          }
          footer {
            text-align: center;
            padding: 2rem;
            background: #f8f9fa;
            color: #6c757d;
            font-size: 0.875rem;
          }
          /* Hide unwanted injected elements */
          #gpt-text-summarize-button {
            display: none !important;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>🗺️ XML Sitemap</h1>
            <p>Gridjac Arts - Digital Solutions</p>
          </header>

          <div class="stats">
            <div class="stat-card">
              <h3><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></h3>
              <p>Total URLs</p>
            </div>
            <div class="stat-card">
              <h3>3</h3>
              <p>Languages (RO, EN, IT)</p>
            </div>
            <div class="stat-card">
              <h3><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority='1'])"/></h3>
              <p>High Priority Pages</p>
            </div>
          </div>

          <div class="content">
            <table>
              <thead>
                <tr>
                  <th style="width: 50%">URL</th>
                  <th style="width: 20%">Last Modified</th>
                  <th style="width: 15%">Change Freq</th>
                  <th style="width: 15%">Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a class="url-cell" href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of select="concat(substring(sitemap:lastmod,0,11))"/>
                    </td>
                    <td>
                      <span>
                        <xsl:attribute name="class">
                          <xsl:choose>
                            <xsl:when test="sitemap:changefreq='monthly'">badge badge-monthly</xsl:when>
                            <xsl:when test="sitemap:changefreq='weekly'">badge badge-weekly</xsl:when>
                            <xsl:otherwise>badge</xsl:otherwise>
                          </xsl:choose>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <span>
                        <xsl:attribute name="class">
                          <xsl:choose>
                            <xsl:when test="sitemap:priority='1'">priority-high</xsl:when>
                            <xsl:when test="sitemap:priority='0.8'">priority-medium</xsl:when>
                            <xsl:otherwise>priority-low</xsl:otherwise>
                          </xsl:choose>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <footer>
            <p>Generated by Gridjac Arts CMS • Last updated: <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/></p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
