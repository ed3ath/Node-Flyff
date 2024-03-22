QUEST_INTHEDARK = {
	title = 'IDS_PROPQUEST_DUNGEONANDPK_INC_000605',
	character = 'MaSa_SainMayor',
	end_character = 'MaSa_SainMayor',
	start_requirements = {
		min_level = 45,
		max_level = 70,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = 'QUEST_EXISTDARK',
	},
	rewards = {
		gold = 0,
		exp = 1331100,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_IBLGUAMARK', quantity = 4, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_IBLGUARDER', quantity = 4 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_IBLGUAMARK', monster_id = 'MI_IBLGUARDER', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000606',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000607',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000608',
		},
		begin_yes = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000609',
		},
		begin_no = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000610',
		},
		completed = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000611',
		},
		not_finished = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000612',
		},
	}
}
