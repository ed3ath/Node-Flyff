QUEST_VOCMAG_TRN3 = {
	title = 'IDS_PROPQUEST_INC_000808',
	character = 'MaFl_Hastan',
	end_character = 'MaSa_Lopaze',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCMAG_TRN2',
	},
	rewards = {
		gold = 1500,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_SCR_RECCURENCE', quantity = 1, sex = 'Any' },
			{ id = 'II_CHR_FOO_COO_BULLHAMS', quantity = 1, sex = 'Any' },
			{ id = 'II_CHR_REF_REF_HOLD', quantity = 1, sex = 'Any' },
			{ id = 'II_CHR_SYS_SCR_ACTIVITION', quantity = 1, sex = 'Any' },
		},
		job = 'JOB_MAGICIAN',
		restat = true,
		reskill = true,
		skill_points = 90
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_NTSKILL', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_SEIDO', quantity = 1 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000809',
			'IDS_PROPQUEST_INC_000810',
			'IDS_PROPQUEST_INC_000811',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000812',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000813',
		},
		completed = {
			'IDS_PROPQUEST_INC_000814',
			'IDS_PROPQUEST_INC_000815',
			'IDS_PROPQUEST_INC_000816',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000817',
		},
	}
}
