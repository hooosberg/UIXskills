# D3.js Visualization Skill

Claude Code skill for creating data visualizations with D3.js. Includes charts, graphs, and interactive diagrams.

## Overview

| Field | Value |
|-------|-------|
| Category | claude-skills |
| Tech Base | Claude Code + D3.js |
| Source | [Community](https://github.com/chrisvoncsefalvay/claude-d3js-skill) |
| License | MIT |
| Dependencies | d3 |

## Purpose

Create stunning data visualizations with D3.js in Claude Code. This skill provides patterns for common chart types and interactive visualizations.

## Installation

```bash
git clone https://github.com/chrisvoncsefalvay/claude-d3js-skill.git ~/.claude/skills/d3js
```

## Example: Bar Chart

```javascript
import * as d3 from 'd3';

const data = [
  { label: 'A', value: 30 },
  { label: 'B', value: 80 },
  { label: 'C', value: 45 },
  { label: 'D', value: 60 },
];

const width = 500;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const svg = d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const x = d3.scaleBand()
  .domain(data.map(d => d.label))
  .range([margin.left, width - margin.right])
  .padding(0.1);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .nice()
  .range([height - margin.bottom, margin.top]);

// Draw bars
svg.selectAll('rect')
  .data(data)
  .join('rect')
  .attr('x', d => x(d.label))
  .attr('y', d => y(d.value))
  .attr('width', x.bandwidth())
  .attr('height', d => y(0) - y(d.value))
  .attr('fill', 'steelblue')
  .on('mouseover', function() {
    d3.select(this).attr('fill', 'orange');
  })
  .on('mouseout', function() {
    d3.select(this).attr('fill', 'steelblue');
  });

// Add axes
svg.append('g')
  .attr('transform', `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x));

svg.append('g')
  .attr('transform', `translate(${margin.left},0)`)
  .call(d3.axisLeft(y));
```

## Example: Line Chart

```javascript
const lineData = [
  { date: new Date('2024-01-01'), value: 100 },
  { date: new Date('2024-02-01'), value: 120 },
  { date: new Date('2024-03-01'), value: 115 },
  { date: new Date('2024-04-01'), value: 140 },
  { date: new Date('2024-05-01'), value: 160 },
];

const x = d3.scaleTime()
  .domain(d3.extent(lineData, d => d.date))
  .range([margin.left, width - margin.right]);

const y = d3.scaleLinear()
  .domain([0, d3.max(lineData, d => d.value)])
  .nice()
  .range([height - margin.bottom, margin.top]);

const line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.value))
  .curve(d3.curveMonotoneX);

svg.append('path')
  .datum(lineData)
  .attr('fill', 'none')
  .attr('stroke', 'steelblue')
  .attr('stroke-width', 2)
  .attr('d', line);
```

## Example: Pie Chart

```javascript
const pieData = [
  { name: 'Category A', value: 30 },
  { name: 'Category B', value: 20 },
  { name: 'Category C', value: 25 },
  { name: 'Category D', value: 25 },
];

const radius = Math.min(width, height) / 2;
const color = d3.scaleOrdinal(d3.schemeCategory10);

const pie = d3.pie()
  .value(d => d.value);

const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius - 10);

const g = svg.append('g')
  .attr('transform', `translate(${width/2},${height/2})`);

const arcs = g.selectAll('arc')
  .data(pie(pieData))
  .join('g');

arcs.append('path')
  .attr('d', arc)
  .attr('fill', d => color(d.data.name))
  .attr('stroke', 'white')
  .attr('stroke-width', 2);

arcs.append('text')
  .attr('transform', d => `translate(${arc.centroid(d)})`)
  .attr('text-anchor', 'middle')
  .text(d => d.data.name);
```

## AI Prompt

> Create a Claude Code skill for D3.js visualizations with:
> - Common chart patterns (bar, line, pie)
> - Scale and axis helpers
> - Interactive hover effects
> - Responsive sizing
> - Data transformation utilities
