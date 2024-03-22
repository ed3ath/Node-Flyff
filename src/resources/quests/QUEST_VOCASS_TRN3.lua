QUEST_VOCASS_TRN3 = {
	title = 'IDS_PROPQUEST_INC_000760',
	character = 'MaFl_Goripeg',
	end_character = 'MaFl_Kidmen',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCASS_TRN2',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_SCR_RECCURENCE', quantity = 1, sex = 'Any' },
			{ id = 'II_CHR_FOO_COO_BULLHAMS', quantity = 1, sex = 'Any' },
			{ id = 'II_CHR_REF_REF_HOLD', quantity = 1, sex = 'Any' },
			{ id = 'II_CHR_SYS_SCR_ACTIVITION', quantity = 1, sex = 'Any' },
		},
		job = 'JOB_ASSIST',
		restat = true,
		reskill = true,
		skill_points = 60
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_NTSKILL', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_CHANER', quantity = 1 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000761',
			'IDS_PROPQUEST_INC_000762',
			'IDS_PROPQUEST_INC_000763',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000764',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000765',
		},
		completed = {
			'IDS_PROPQUEST_INC_000766',
			'IDS_PROPQUEST_INC_000767',
			'IDS_PROPQUEST_INC_000768',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000769',
		},
	}
}
