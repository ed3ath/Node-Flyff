QUEST_VOCMER_TRN3 = {
	title = 'IDS_PROPQUEST_INC_000711',
	character = 'MaFl_Langdrong',
	end_character = 'MaFl_Hyuit',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCMER_TRN2',
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
		job = 'JOB_MERCENARY',
		restat = true,
		reskill = true,
		skill_points = 40
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_NTSKILL', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_BABARI', quantity = 1 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000712',
			'IDS_PROPQUEST_INC_000713',
			'IDS_PROPQUEST_INC_000714',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000715',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000716',
		},
		completed = {
			'IDS_PROPQUEST_INC_000717',
			'IDS_PROPQUEST_INC_000718',
			'IDS_PROPQUEST_INC_000719',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000720',
		},
	}
}
