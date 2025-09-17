QUEST_VOCACR_TRN3 = {
	title = 'IDS_PROPQUEST_INC_000503',
	character = 'MaFl_Tucani',
	end_character = 'MaDa_Tailer',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCACR_TRN2',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_SCR_RECCURENCE', quantity = 1, sex = 'Any' },
			{ id = 'II_CHR_FOO_COO_BULLHAMS', quantity = 1, sex = 'Any' },
			{ id = 'II_CHR_POT_DRI_VITALX', quantity = 1, sex = 'Any' },
			{ id = 'II_CHR_SYS_SCR_ACTIVITION', quantity = 1, sex = 'Any' },
		},
		job = 'JOB_ACROBAT',
		restat = true,
		reskill = true,
		skill_points = 50
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_NTSKILL', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_SHURAITURE', quantity = 1 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000504',
			'IDS_PROPQUEST_INC_000505',
			'IDS_PROPQUEST_INC_000506',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000507',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000508',
		},
		completed = {
			'IDS_PROPQUEST_INC_000509',
			'IDS_PROPQUEST_INC_000510',
			'IDS_PROPQUEST_INC_000511',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000512',
		},
	}
}
